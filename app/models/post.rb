class Post < ActiveRecord::Base
    belongs_to :categories
    has_one :category
end
