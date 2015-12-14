class Car
  include Mongoid::Document
  embedded_in :user
  field :coordinates, type: String
  field :description, type: String
  field :address, type: String
  field :shared, type: Array
end