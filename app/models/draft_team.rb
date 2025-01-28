class DraftTeam < ApplicationRecord
  belongs_to :user
  has_many :players_draft_teams, dependent: :destroy
  has_many :players, through: :players_draft_teams

  VALID_FORMATIONS = [
    { defenders: 3, midfielders: 4, attackers: 3 },
    { defenders: 4, midfielders: 4, attackers: 2 }
  ].freeze

  validates :name, presence: true
  validates :league, presence: true
  validate :valid_team_size, if: -> { players.any? }
  validate :valid_formation, if: -> { players.any? }
  validate :unique_players, if: -> { players.any? }

  def self.ransackable_attributes(auth_object = nil)
    ["id", "name", "league", "user_id", "created_at", "updated_at"]
  end

  def self.ransackable_associations(auth_object = nil)
    ["user", "players_draft_teams", "players"]
  end

  private

  def generate_id
    self.id = init_id('drt')
  end

  def valid_team_size
    return if players.size == 11
    errors.add(:base, 'Team must have exactly 11 players')
  end

  def valid_formation
    defenders = players.where(position: 'Defender').count
    midfielders = players.where(position: 'Midfielder').count
    attackers = players.where(position: 'Attacker').count
    goalkeepers = players.where(position: 'Goalkeeper').count

    unless goalkeepers == 1
      errors.add(:base, 'Team must have exactly 1 goalkeeper')
      return
    end

    valid_formation = VALID_FORMATIONS.any? do |formation|
      formation[:defenders] == defenders &&
      formation[:midfielders] == midfielders &&
      formation[:attackers] == attackers
    end

    unless valid_formation
      errors.add(:base, 'Invalid formation. Must be either 3-4-3 or 4-4-2')
    end
  end

  def unique_players
    player_ids = players.map(&:id)
    if player_ids.uniq.length != player_ids.length
      errors.add(:base, 'Cannot have duplicate players in the team')
    end
  end
end

# == Schema Information
#
# Table name: draft_teams
#
#  id         :string           not null, primary key
#  user_id    :string           not null
#  name       :string           not null
#  league     :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
# Indexes
#
#  index_draft_teams_on_user_id  (user_id)
#
# Foreign Keys
#
#  fk_rails_...  (user_id => users.id)
#
