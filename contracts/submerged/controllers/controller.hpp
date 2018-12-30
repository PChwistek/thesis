class controller {
  private: 
    name _self;
  public:
    controller(name self): _self(self) {}
    
    name get_self() {
      return _self;
    }
};