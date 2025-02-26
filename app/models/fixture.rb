class Fixture < ApplicationRecord
  belongs_to :match

  validates :api_id, presence: true, uniqueness: true
  validates :date, presence: true
end

# == Schema Information
#
# Table name: fixtures
#
#  id         :string           not null, primary key
#  match_id   :string           not null
#  api_id     :integer          not null
#  date       :date             not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
# Indexes
#
#  index_fixtures_on_api_id    (api_id) UNIQUE
#  index_fixtures_on_match_id  (match_id)
#
# Foreign Keys
#
#  fk_rails_...  (match_id => matches.id)
#
