class CreateFixtures < ActiveRecord::Migration[7.0]
  def change
    create_table :fixtures, id: :string do |t|
      t.references :match, null: false, foreign_key: true, type: :string
      t.integer :api_id, null: false, unique: true
      t.date :date, null: false

      t.timestamps
    end

    add_index :fixtures, :api_id, unique: true
  end
end