collection @animations

attributes :title, :frame_count, :id

node(:total) do 
  @animations.total_count
end

node(:num_pages) do 
  @animations.num_pages
end

node(:current_page) do 
  @animations.current_page
end

@animations.each do |animation|
  node(:url) do |animation| 
    if animation.gif_container
      animation.gif_container.animated_gif.url 
    end
  end

  node(:finished) do |animation| 
    if animation.gif_container
      1
    else
      0 
    end
  end

  node(:owner) {|animation| animation.owner.email }
end