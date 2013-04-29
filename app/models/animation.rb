class Animation < ActiveRecord::Base
  attr_accessible :owner_id, :title

  has_many :frames


  def build_gif
    # causes in errror if run twice
    dir = "#{Rails.root}/tmp/uploads/test10/"
    
    FileUtils.mkdir(dir)

    self.frames.each do |frame|

      File.open("#{dir}animation#{frame.id}.gif", 'wb') do|f|
        f.write(Base64.decode64(frame.data_url))
      end
    end

    image = MiniMagick::Image.new(dir)

    image.run_command("convert -delay 20 -loop 0 #{dir}*.gif #{dir}test.gif")
  end
end
 