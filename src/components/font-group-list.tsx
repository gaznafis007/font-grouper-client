import { useState, useEffect } from "react"
import { getFontGroups, deleteFontGroup } from "../services/api"
import { useToast } from "../hooks/use-toast"
import FontGroupForm from "./font-group-form"
import ConfirmDialog from "./confirm-dialog"
import { FiEdit2, FiTrash2, FiLoader } from "react-icons/fi"

interface FontGroup {
  id: string
  name: string
  fonts: {
    id: string
    name: string
  }[]
}

export default function FontGroupList() {
  const [groups, setGroups] = useState<FontGroup[]>([])
  const [loading, setLoading] = useState(true)
  const [editingGroup, setEditingGroup] = useState<FontGroup | null>(null)
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false)
  const [groupToDelete, setGroupToDelete] = useState<string | null>(null)
  const { toast } = useToast()

  const loadGroups = async () => {
    try {
      setLoading(true)
      const data = await getFontGroups()
      setGroups(data)
    } catch (error) {
        console.log(error)
      toast({
        title: "Error loading font groups",
        description: `There was a problem fetching the font groups`,
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadGroups()
  }, [toast])

  const handleEdit = (group: FontGroup) => {
    setEditingGroup(group)
  }

  const handleDelete = async () => {
    if (!groupToDelete) return

    try {
      await deleteFontGroup(groupToDelete)
      setGroups(groups.filter((group) => group.id !== groupToDelete))
      toast({
        title: "Font group deleted",
        description: "The font group has been deleted successfully",
      })
    } catch (error) {
        console.log(error)
      toast({
        title: "Error deleting font group",
        description: "There was a problem deleting the font group",
        variant: "destructive",
      })
    } finally {
      setGroupToDelete(null)
      setDeleteConfirmOpen(false)
    }
  }

  const confirmDelete = (groupId: string) => {
    setGroupToDelete(groupId)
    setDeleteConfirmOpen(true)
  }

  if (editingGroup) {
    return (
      <div>
        <button
          onClick={() => setEditingGroup(null)}
          className="mb-4 text-sm text-gray-600 hover:text-gray-900 flex items-center"
        >
          ← Back to Font Groups
        </button>

        <FontGroupForm
          editMode={true}
          groupId={editingGroup.id}
          initialData={{
            name: editingGroup.name,
            fonts: editingGroup.fonts.map((font) => ({ id: font.id })),
          }}
          onSuccess={() => {
            setEditingGroup(null)
            loadGroups()
          }}
        />
      </div>
    )
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <FiLoader className="h-8 w-8 animate-spin text-gray-500" />
      </div>
    )
  }

  if (groups.length === 0) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-sm text-center">
        <h2 className="text-xl font-semibold mb-4">Font Groups</h2>
        <p className="text-gray-500">No font groups created yet. Create some groups to see them here.</p>
      </div>
    )
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-xl font-semibold mb-4">Font Groups</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Group Name
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Fonts
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {groups.map((group) => (
              <tr key={group.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{group.name}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-500">
                    {group.fonts.length} fonts
                    <div className="mt-1 text-xs text-gray-400">{group.fonts.map((font) => font.name).join(", ")}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2">
                    <button onClick={() => handleEdit(group)} className="text-gray-600 hover:text-gray-900">
                      <FiEdit2 className="h-5 w-5" />
                    </button>
                    <button onClick={() => confirmDelete(group.id)} className="text-gray-600 hover:text-red-600">
                      <FiTrash2 className="h-5 w-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ConfirmDialog
        isOpen={deleteConfirmOpen}
        onClose={() => setDeleteConfirmOpen(false)}
        onConfirm={handleDelete}
        title="Delete Font Group"
        message="Are you sure you want to delete this font group? This action cannot be undone."
      />
    </div>
  )
}
