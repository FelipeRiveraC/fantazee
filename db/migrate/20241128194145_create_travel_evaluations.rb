class CreateTravelEvaluations < ActiveRecord::Migration[7.0]
  def change
    create_table :travel_evaluations, id: :string do |t|
      t.references :user, null: false, foreign_key: true, type: :string
      t.references :travel, null: false, foreign_key: true, type: :string
      t.integer :rating, null: false
      t.text :comment
      t.timestamps
    end
  end
end