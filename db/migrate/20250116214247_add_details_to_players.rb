class AddDetailsToPlayers < ActiveRecord::Migration[7.0]
  def change
    add_column :players, :firstname, :string
    add_column :players, :lastname, :string
    add_column :players, :age, :integer
    add_column :players, :birth_date, :date
    add_column :players, :birth_place, :string
    add_column :players, :birth_country, :string
    add_column :players, :nationality, :string
    add_column :players, :height, :string
    add_column :players, :weight, :string
    add_column :players, :number, :integer
    add_column :players, :position, :string
    
    # Rename photo_url to match API
    rename_column :players, :photo_url, :photo
  end
end