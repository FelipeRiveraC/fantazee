class PlayerStatistic < ApplicationRecord
  belongs_to :player
  belongs_to :match

  POINTS_MULTIPLIERS = {
    # Game participation and performance
    GAMES_MINUTES:       0.1,   # e.g. 0.1 point per minute played
    GAMES_RATING:        1.0,   # multiplier on game rating (ensure conversion from string if needed)
    GAMES_CAPTAIN:       2.0,   # bonus multiplier when the player is captain (applied separately)
  
    # Shooting contributions
    SHOTS_TOTAL:         0.1,   # each shot contributes a small bonus
    SHOTS_ON:            0.2,   # shots on target add a bit more
  
    # Goal contributions
    GOALS_TOTAL:         4.0,   # standard points for scoring a goal
    GOALS_ASSISTS:       3.0,   # points for assisting a goal
    GOALS_SAVES:         1.0,   # bonus for saves (typically for goalkeepers)
    GOALS_CONCEDED:     -1.0,   # penalty for each goal conceded (for defensive players)
  
    # Passing contributions
    PASSES_TOTAL:        0.01,  # points per pass made
    PASSES_KEY:          0.5,   # bonus for key passes that lead to shots
    PASSES_ACCURACY:     0.1,   # multiplier on passing accuracy percentage
  
    # Defensive contributions
    TACKLES_TOTAL:       1.0,   # points per tackle
    TACKLES_BLOCKS:      1.0,   # points per block
    TACKLES_INTERCEPTIONS:1.0,   # points per interception
  
    # Duels and individual contests
    DUELS_TOTAL:         0.05,  # small bonus per duel entered
    DUELS_WON:           0.5,   # bonus for winning a duel
  
    # Dribbling and ball progression
    DRIBBLES_SUCCESS:    0.3,   # bonus per successful dribble
    DRIBBLES_PAST:       0.3,   # bonus when beating an opponent
  
    # Fouls and disciplinary actions
    FOULS_DRAWN:         0.5,   # bonus for drawing a foul
    FOULS_COMMITTED:    -0.5,   # penalty for committing a foul
    CARDS_YELLOW:       -1.0,   # penalty for a yellow card
    CARDS_RED:          -3.0,   # penalty for a red card
  
    # Penalty related events
    PENALTY_WON:         1.0,   # bonus for winning a penalty kick
    PENALTY_COMMITTED:   -1.0,  # penalty for committing a penalty foul
    PENALTY_SCORED:      5.0,   # bonus for scoring a penalty kick
    PENALTY_MISSED:      -2.0,  # penalty for missing a penalty kick
    PENALTY_SAVED:       5.0    # bonus for saving a penalty (typically for goalkeepers)
  }.freeze
  

  def calculate_points
    POINTS_MULTIPLIERS.sum do |attribute, multiplier|
      value = self[attribute.downcase]
      numeric_value =
        if value.is_a?(TrueClass) || value.is_a?(FalseClass)
          value ? 1.0 : 0.0
        elsif value.present?
          value.to_f
        else
          0.0
        end
      numeric_value * multiplier
    end
  end
  
  def self.ransackable_attributes(auth_object = nil)
    [
      "id", "player_id", "match_id", 
      "games_minutes", "games_rating", 
      "goals_total", "goals_assists", "goals_saves",
      "passes_total", "passes_accuracy",
      "created_at", "updated_at"
    ]
  end

  def self.ransackable_associations(auth_object = nil)
    ["player", "match"]
  end

  private

  def generate_id
    self.id = init_id('pst')
  end
end

# == Schema Information
#
# Table name: player_statistics
#
#  id                    :string           not null, primary key
#  player_id             :string           not null
#  match_id              :string           not null
#  games_minutes         :integer
#  games_number          :integer
#  games_position        :string
#  games_rating          :string
#  games_captain         :boolean          default(FALSE)
#  games_substitute      :boolean          default(FALSE)
#  shots_total           :integer
#  shots_on              :integer
#  goals_total           :integer
#  goals_conceded        :integer
#  goals_assists         :integer
#  goals_saves           :integer
#  passes_total          :integer
#  passes_key            :integer
#  passes_accuracy       :string
#  tackles_total         :integer
#  tackles_blocks        :integer
#  tackles_interceptions :integer
#  duels_total           :integer
#  duels_won             :integer
#  dribbles_attempts     :integer
#  dribbles_success      :integer
#  dribbles_past         :integer
#  fouls_drawn           :integer
#  fouls_committed       :integer
#  cards_yellow          :integer
#  cards_red             :integer
#  penalty_won           :integer
#  penalty_committed     :integer
#  penalty_scored        :integer
#  penalty_missed        :integer
#  penalty_saved         :integer
#  created_at            :datetime         not null
#  updated_at            :datetime         not null
#  live                  :boolean          default(FALSE)
#
# Indexes
#
#  index_player_statistics_on_match_id   (match_id)
#  index_player_statistics_on_player_id  (player_id)
#
# Foreign Keys
#
#  fk_rails_...  (match_id => matches.id)
#  fk_rails_...  (player_id => players.id)
#
