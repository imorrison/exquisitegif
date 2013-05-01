collection @animations 

attributes :title, :frames_count, :id

@animations.each do |animation|
  node(:url) do |animation| 
    if animation.gif_container
      animation.gif_container.animated_gif.url 
    end
  end
end
