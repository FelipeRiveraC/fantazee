class Match < ApplicationRecord
  has_many :player_statistics, dependent: :destroy
  has_many :players, through: :player_statistics

  private

  def generate_id
    init_id('mat')
  end
end

# == Schema Information
#
# Table name: matches
#
#  id         :string           not null, primary key
#  api_id     :integer          not null
#  date       :date             not null
#  league     :string           not null
#  season     :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
# Indexes
#
#  index_matches_on_api_id  (api_id) UNIQUE
#
