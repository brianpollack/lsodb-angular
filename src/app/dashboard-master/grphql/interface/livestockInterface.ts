export interface Livestock  {
    id: string;
    livestockName: string;
    breedCount: number;
    editMode?: string; 
};

export interface Breed {
    id: string;
    breedName: String
    livestock: LivestockRef 
    
  }

 export interface LivestockRef {
    livestockId: string;    
}


export interface ParamsCreateLivestock {
    livestockName: string
  }

  export interface  ParamsEditLiveStock {
      livestockId: string;
      livestockName: string;
  }

  export interface  ParamsDeleteLivestock {
    livestockId: string;
  }

 

 