class CreatePlayers < ActiveRecord::Migration[7.0]
  def change
    create_table :players, id: :string do |t|
      t.integer :api_id, null: false, unique: true
      t.string :name, null: false
      t.string :photo_url

      t.timestamps
    end

    add_index :players, :api_id, unique: true
  end
end
