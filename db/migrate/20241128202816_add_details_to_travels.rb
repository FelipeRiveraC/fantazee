class AddDetailsToTravels < ActiveRecord::Migration[7.0]
  def change
    change_table :travels, bulk: true do |t|
      # Location Information
      t.string :origin, comment: "Origin of the travel"
      t.string :destination, comment: "Destination of the travel"
      t.decimal :distance_km, precision: 10, scale: 2, comment: "Estimated distance in kilometers"

      # Date and Time
      t.datetime :start_date, comment: "Start date and time of the travel"
      t.datetime :end_date, comment: "End date and time of the travel"

      # Pricing and Budget
      t.decimal :estimated_budget, precision: 15, scale: 2, comment: "Estimated budget for the travel"
      t.string :currency, comment: "Currency for the budget"

      # Participants
      t.integer :max_participants, comment: "Maximum number of participants"
      t.integer :current_participants, default: 0, comment: "Current number of participants"

      # Additional Details
      t.integer :travel_type, comment: "Type of travel (e.g., business, leisure)"
      t.text :notes, comment: "Additional notes about the travel"
      t.boolean :is_public, default: false, comment: "Indicates if the travel is public or private"
    end
  end
end
