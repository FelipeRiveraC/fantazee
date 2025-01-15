class CreatePlayerStatistics < ActiveRecord::Migration[7.0]
  def change
    create_table :player_statistics, id: :string do |t|
      t.references :player, null: false, foreign_key: true, type: :string
      t.references :match, null: false, foreign_key: true, type: :string

      # Juegos
      t.integer :games_minutes
      t.integer :games_number
      t.string :games_position
      t.string :games_rating
      t.boolean :games_captain, default: false
      t.boolean :games_substitute, default: false

      # Tiros
      t.integer :shots_total
      t.integer :shots_on

      # Goles
      t.integer :goals_total
      t.integer :goals_conceded
      t.integer :goals_assists
      t.integer :goals_saves

      # Pases
      t.integer :passes_total
      t.integer :passes_key
      t.string :passes_accuracy

      # Entradas
      t.integer :tackles_total
      t.integer :tackles_blocks
      t.integer :tackles_interceptions

      # Duelos
      t.integer :duels_total
      t.integer :duels_won

      # Regates
      t.integer :dribbles_attempts
      t.integer :dribbles_success
      t.integer :dribbles_past

      # Faltas
      t.integer :fouls_drawn
      t.integer :fouls_committed

      # Tarjetas
      t.integer :cards_yellow
      t.integer :cards_red

      # Penaltis
      t.integer :penalty_won
      t.integer :penalty_committed
      t.integer :penalty_scored
      t.integer :penalty_missed
      t.integer :penalty_saved

      t.timestamps
    end
  end
end
