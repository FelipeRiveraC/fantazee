class AddFormationToDraftTeams < ActiveRecord::Migration[7.0]
  def change
    add_column :draft_teams, :formation, :string, default: '3-4-3'
    
    # Add check constraint to ensure only valid formations
    add_check_constraint :draft_teams, 
      "formation IN ('3-4-3', '4-4-2')", 
      name: 'valid_formation_check'
  end
end