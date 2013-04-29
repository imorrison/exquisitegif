class Frame < ActiveRecord::Base
  attr_accessible :animation_id, :data_url, :user_id

  belongs_to :animation
  belongs_to :users

  def write_data_to_file
    # I needs to know the largest number and pad it with zeros
    # otherwise this will confuse imagemagik

    File.open("uploads/animation#{self.id}.gif", 'wb') do|f|
      f.write(Base64.decode64(self.data_url))
    end
  end
end

# convert -delay 20 -loop 0 *.gif <name>.gif