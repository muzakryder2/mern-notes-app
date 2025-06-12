import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router'
import { ArrowLeftIcon, LoaderIcon, Trash2Icon } from 'lucide-react'
import toast from 'react-hot-toast'
import api from '../lib/axios'

const NoteDetailsPage = () => {
  const [note, setNote] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  const navigate = useNavigate()
  const { id } = useParams()

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await api.get(`/notes/${id}`)
        setNote(res.data)
      } catch (error) {
        console.error(`Error fetching note: ${error.message || error}`)

        if (error.response.status === 429) {
          toast.error('Slow down! You are fetching notes too quickly.', {
            duration: 4000,
            icon: '💀',
          })
        } else {
          toast.error('Failed to fetch note')
        }
      } finally {
        setLoading(false)
      }
    }

    fetchNote()
  }, [id])

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this note?')) return

    try {
      await api.delete(`/notes/${id}`)
      toast.success('Note deleted successfully')
      navigate('/')
    } catch (error) {
      console.error(`Error deleteing note: ${error.message || error}`)

      if (error.response.status === 429) {
        toast.error('Too many requests, please try again later.', {
          duration: 4000,
          icon: '💀',
        })
      } else {
        toast.error('Failed to delete note')
      }
    }
  }

  const handleSave = async () => {
    if (!note.title.trim() || !note.content.trim()) {
      toast.error('All fields are required')
      return
    }

    setSaving(true)

    try {
      await api.put(`/notes/${id}`, note)
      toast.success('Note updated successfully')
      navigate('/')
    } catch (error) {
      console.error(`Error saving note: ${error.message || error}`)

      if (error.response.status === 429) {
        toast.error('Too many requests. Please try again later.', {
          duration: 4000,
          icon: '💀',
        })
      } else {
        toast.error('Failed to save note')
      }
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className='min-h-screen bg-base-200 flex items-center justify-center'>
        <LoaderIcon className='animate-spin size-10' />
      </div>
    )
  }

  return (
    <div className='min-h-screen bg-base-200'>
      <div className='container mx-auto px-4 py-8'>
        <div className='max-w-2xl mx-auto'>
          <div className='flex items-center justify-between mb-6'>
            <Link to='/' className='btn btn-ghost hover:bg-primary/20'>
              <ArrowLeftIcon className='size-5' />
              Back to Notes
            </Link>
            <button
              className='btn btn-error btn-outline'
              onClick={handleDelete}
            >
              <Trash2Icon className='size-5' />
              Delete Note
            </button>
          </div>
          <div className='card bg-base-100'>
            <div className='card-body'>
              <div className='form-control mb-4'>
                <div className='fieldset w-full'>
                  <legend className='fieldset-legend'>Title</legend>
                  <input
                    type='text'
                    placeholder='Note Title'
                    className='input w-full'
                    value={note.title}
                    onChange={(e) =>
                      setNote({ ...note, title: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className='form-control mb-4'>
                <fieldset className='fieldset w-full'>
                  <legend className='fieldset-legend'>Content</legend>
                  <textarea
                    className='textarea h-32 w-full'
                    placeholder='Write your note here...'
                    value={note.content}
                    onChange={(e) =>
                      setNote({ ...note, content: e.target.value })
                    }
                  ></textarea>
                </fieldset>
              </div>
              <div className='card-actions justify-end'>
                <button
                  className='btn btn-primary'
                  disabled={saving}
                  onClick={handleSave}
                >
                  {saving ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NoteDetailsPage
