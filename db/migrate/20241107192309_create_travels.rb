class CreateTravels < ActiveRecord::Migration[7.0]
  def change
    create_table :travels, id: :string do |t|
      t.string :name
      t.string :description
      t.integer :status
      t.timestamps
    end
  end
end
