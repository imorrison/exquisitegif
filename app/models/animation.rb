class Animation < ActiveRecord::Base
  attr_accessible :owner_id, :title

  has_many :frames, :dependent => :destroy
  has_one :gif_container, :dependent => :destroy

  validates :owner_id, :title, presence: true

  def build_gif
    unless self.gif_container
      dir = random_dir_name 
      FileUtils.mkdir(dir)

      file_name = SecureRandom.hex

      build_frames(dir)
      run_image_magick(dir, file_name)
      save_associated_gif_container(dir, file_name)
    end
  end

  def as_json(options = {})
    # I need a better solution for this
    json = {
      id: self.id,
      title: self.title
    }

    if self.gif_container
      return json.merge({url: self.gif_container.animated_gif.url})
    end
    json
  end

  private
    def random_dir_name
      "#{Rails.root}/tmp/uploads/#{SecureRandom.hex}/"
    end

    def build_frames(dir)
      self.frames.each_with_index do |frame, i|
        file_name = "#{i}".rjust(6, "0")

        File.open("#{dir}frame#{file_name}.gif", 'wb') do|f|
          f.write(Base64.decode64(frame.data_url))
        end
      end
    end

    def run_image_magick(dir, file_name)
      image = MiniMagick::Image.new(dir)
      image.run_command("convert -delay 20 -dispose previous -loop 0 #{dir}*.gif #{dir}#{file_name}.gif")
    end

    def save_associated_gif_container(dir, file_name)
      c = self.build_gif_container

      File.open("#{dir}#{file_name}.gif") do |f|
        c.animated_gif = f
      end

      c.save
    end
end
 