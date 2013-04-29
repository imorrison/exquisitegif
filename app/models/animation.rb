class Animation < ActiveRecord::Base
  attr_accessible :owner_id, :title

  has_many :frames
  has_one :gif_container

  def build_gif
    unless self.gif_container
      dir = random_dir_name 
      FileUtils.mkdir(dir)

      build_frames(dir)
      run_image_magick(dir)
      save_associated_gif_container(dir)
    end
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

    def run_image_magick(dir)
      image = MiniMagick::Image.new(dir)
      image.run_command("convert -delay 20 -loop 0 #{dir}*.gif #{dir}animation.gif")
    end

    def save_associated_gif_container(dir)
      c = self.build_gif_container

      File.open("#{dir}animation.gif") do |f|
        c.animated_gif = f
      end

      c.save
    end
end
 