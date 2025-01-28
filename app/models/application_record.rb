class ApplicationRecord < ActiveRecord::Base
  primary_abstract_class
  include IdGenerator
  before_create :generate_id

  private

  def generate_id
    self.id ||= init_id
  end

  def init_id(prefix = nil)
    loop do
      # Generate a random ID with optional prefix
      random_id = prefix ? "#{prefix}_#{SecureRandom.hex(4)}" : SecureRandom.hex(8)
      break random_id unless self.class.exists?(id: random_id)
    end
  end
end
