class CreatePlayersDraftTeams < ActiveRecord::Migration[7.0]
  def change
    create_table :players_draft_teams, id: :string do |t|
      t.references :draft_team, null: false, foreign_key: true, type: :string
      t.references :player, null: false, foreign_key: true, type: :string

      t.timestamps
    end
  end
end
