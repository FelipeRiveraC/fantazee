class PlayerStatistic < ApplicationRecord
  belongs_to :player
  belongs_to :match

  private

  def generate_id
    init_id('pst')
  end
end
