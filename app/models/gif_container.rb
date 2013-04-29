class GifContainer < ActiveRecord::Base
  attr_accessible :animation_id, :animated_gif

  belongs_to :animation

  has_attached_file :animated_gif
end
