class CreateTravelRequests < ActiveRecord::Migration[7.0]
  def change
    create_table :travel_requests, id: :string do |t|
      t.references :user, null: false, foreign_key: true, type: :string
      t.references :travel, null: false, foreign_key: true, type: :string
      t.integer :status, default: 0
      t.text :message
      t.timestamps
    end
  end
end
