class Save < ActiveRecord::Base
	validates :identifier, presence: true, uniqueness: { case_sensitive: false }

  def self.find(input)
    if input && input.to_i == 0 
      find_by_identifier(input.downcase)
    else 
      super
    end
  end
end
