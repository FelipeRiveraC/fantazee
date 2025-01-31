class Player < ApplicationRecord
  has_many :player_statistics, dependent: :destroy
  has_many :matches, through: :player_statistics
  has_many :players_draft_teams, dependent: :destroy
  has_many :draft_teams, through: :players_draft_teams

  validates :api_id, presence: true, uniqueness: true
  validates :name, presence: true
  validates :position, inclusion: { in: %w[Defender Midfielder Attacker Goalkeeper], message: "%{value} is not a valid position" }, allow_nil: true

  POSITIONS = %w[Defender Midfielder Attacker].freeze

  def self.ransackable_attributes(auth_object = nil)
    [
      "id", "api_id", "name", "photo", "firstname", "lastname",
      "age", "nationality", "height", "weight", "number",
      "position", "created_at", "updated_at"
    ]
  end

  def self.ransackable_associations(auth_object = nil)
    ["player_statistics", "matches", "players_draft_teams", "draft_teams"]
  end

  def birth
    {
      date: birth_date&.iso8601,
      place: birth_place,
      country: birth_country
    }
  end

  def as_json(options = {})
    super(options).tap do |json|
      json['birth'] = birth
    end
  end

  private

  def generate_id
    self.id = init_id('pla')
  end
end

# == Schema Information
#
# Table name: players
#
#  id            :string           not null, primary key
#  api_id        :integer          not null
#  name          :string           not null
#  photo         :string
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#  firstname     :string
#  lastname      :string
#  age           :integer
#  birth_date    :date
#  birth_place   :string
#  birth_country :string
#  nationality   :string
#  height        :string
#  weight        :string
#  number        :integer
#  position      :string
#
# Indexes
#
#  index_players_on_api_id  (api_id) UNIQUE
#
