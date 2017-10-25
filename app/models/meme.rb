class Meme < ActiveRecord::Base
	# if Rails.env.development?
	has_attached_file :avatar, styles: { medium: "300x300>", thumb: "100x100>" }, default_url: "/images/:style/missing.png"
  	validates_attachment_content_type :avatar, content_type: /\Aimage\/.*\z/
	#  else
	#for some reasons this is causing errors
	#need to investigate later
		# has_attached_file :avatar, styles: { medium: "300x300>", thumb: "100x100>" }, 
		# default_url: "/images/:style/missing.png",
 	
 	# 	:storage => :dropbox,
  #   	:dropbox_credentials => Rails.root.join("config/dropbox.yml"),
  #   	:path => ":style/:id_:filename"
    # validates_attachment_content_type :avatar, content_type: /\Aimage\/.*\Z/
    # validates_attachment :avatar, content_type: { content_type: ["image/jpg", "image/jpeg",     "image/png"] }
end

