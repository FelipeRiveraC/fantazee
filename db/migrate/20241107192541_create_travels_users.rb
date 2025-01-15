class CreateTravelsUsers < ActiveRecord::Migration[7.0]
  def change
    create_table :travels_users, id: :string do |t|
      t.references :travel, null: false, foreign_key: true, type: :string
      t.references :user, null: false, foreign_key: true, type: :string
      t.integer :role
      t.timestamps
    end
  end
end
