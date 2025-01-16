class CreateDraftTeams < ActiveRecord::Migration[7.0]
  def change
    create_table :draft_teams, id: :string do |t|
      t.references :user, null: false, foreign_key: true, type: :string
      t.string :name, null: false
      t.string :league, null: false
      t.timestamps
    end
  end
end
