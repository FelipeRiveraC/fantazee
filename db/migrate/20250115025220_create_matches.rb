class CreateMatches < ActiveRecord::Migration[7.0]
  def change
    create_table :matches, id: :string do |t|
      t.integer :api_id, null: false, unique: true
      t.date :date, null: false
      t.string :league, null: false
      t.string :season, null: false

      t.timestamps
    end

    add_index :matches, :api_id, unique: true
  end
end
