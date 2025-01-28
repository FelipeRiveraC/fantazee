ActiveAdmin.register_page "Aggregated Statistics" do
  menu priority: 3, label: "Stats Overview"

  content title: "Aggregated Player Statistics" do
    table_for Player.includes(:player_statistics).all do
      column :name
      column :position
      column "Total Matches" do |player|
        player.player_statistics.count
      end
      column "Total Minutes" do |player|
        player.player_statistics.sum(:games_minutes)
      end
      column "Average Rating" do |player|
        stats = player.player_statistics
        if stats.any?
          (stats.sum { |s| s.games_rating.to_f } / stats.count).round(2)
        else
          0
        end
      end
      column "Total Goals" do |player|
        player.player_statistics.sum(:goals_total)
      end
      column "Total Assists" do |player|
        player.player_statistics.sum(:goals_assists)
      end
      column "Total Saves" do |player|
        player.player_statistics.sum(:goals_saves)
      end
      column "Pass Accuracy" do |player|
        stats = player.player_statistics
        if stats.any?
          "#{(stats.sum { |s| s.passes_accuracy.to_f } / stats.count).round(2)}%"
        else
          "0%"
        end
      end
      column "Yellow Cards" do |player|
        player.player_statistics.sum(:cards_yellow)
      end
      column "Red Cards" do |player|
        player.player_statistics.sum(:cards_red)
      end
      column "Clean Sheets" do |player|
        player.player_statistics.where(goals_conceded: 0).count
      end
    end
  end

  controller do
    def index
      @players = Player.includes(:player_statistics)
                      .where.not(player_statistics: { id: nil })
                      .order(:name)
    end
  end
end 