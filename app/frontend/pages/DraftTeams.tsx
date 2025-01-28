import { useState } from 'react';
import { useDraftTeams, useUpdateDraftTeam } from '../hooks/useDraftTeams';

export const DraftTeams: React.FC = () => {
  const { data: teams, isLoading } = useDraftTeams();
  const updateDraftTeam = useUpdateDraftTeam();
  const [editingTeam, setEditingTeam] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({ name: '', league: '' });

  if (isLoading) return <div>Loading...</div>;

  const handleEdit = (team: DraftTeam) => {
    setEditingTeam(team.id);
    setEditForm({ name: team.name, league: team.league });
  };

  const handleSave = async (id: string) => {
    try {
      await updateDraftTeam.mutateAsync({
        id,
        data: editForm
      });
      setEditingTeam(null);
    } catch (error) {
      alert('Failed to update team');
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">My Draft Teams</h1>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {teams?.map(team => (
          <div key={team.id} className="bg-gray-800 rounded-lg p-4">
            {editingTeam === team.id ? (
              <>
                <input
                  type="text"
                  value={editForm.name}
                  onChange={e => setEditForm({ ...editForm, name: e.target.value })}
                  className="w-full p-2 mb-2 rounded"
                />
                <input
                  type="text"
                  value={editForm.league}
                  onChange={e => setEditForm({ ...editForm, league: e.target.value })}
                  className="w-full p-2 mb-2 rounded"
                />
                <button
                  onClick={() => handleSave(team.id)}
                  className="bg-green-600 text-white px-4 py-2 rounded mr-2"
                >
                  Save
                </button>
                <button
                  onClick={() => setEditingTeam(null)}
                  className="bg-gray-600 text-white px-4 py-2 rounded"
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <h2 className="text-xl font-bold">{team.name}</h2>
                <p className="text-gray-400">{team.league}</p>
                <p className="mt-2">Players: {team.players.length}</p>
                <button
                  onClick={() => handleEdit(team)}
                  className="mt-4 bg-purple-600 text-white px-4 py-2 rounded"
                >
                  Edit
                </button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}; 