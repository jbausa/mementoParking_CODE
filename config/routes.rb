Rails.application.routes.draw do
  
  devise_for :users

  root    'static_pages#home'

  get 'help'  =>  'static_pages#help'

  get 'about' =>  'static_pages#about'

  get 'maps'  =>  'static_pages#maps'

  get 'contact' => 'contact_us/contacts#new'

  get 'coords' => 'static_pages#coords'

  get 'car' => 'static_pages#car'

  get 'editCar' => 'static_pages#editCar'

  get 'newCar' => 'static_pages#newCar'

  get 'deleteCar' =>  'static_pages#deleteCar'

end
