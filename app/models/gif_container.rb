class GifContainer < ActiveRecord::Base
  attr_accessible :animation_id, :animated_gif

  belongs_to :animation

  has_attached_file :animated_gif

  def as_json(options = {})
    {
      url: self.animated_gif.url
    }
  end
end
