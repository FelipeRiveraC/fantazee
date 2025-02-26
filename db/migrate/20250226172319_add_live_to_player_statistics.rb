class AddLiveToPlayerStatistics < ActiveRecord::Migration[7.0]
  def change
    add_column :player_statistics, :live, :boolean, default: false
  end
end