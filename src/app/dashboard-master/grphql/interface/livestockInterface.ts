export interface Livestock  {
    id: string;
    livestockName: string;
    breedCount: number;
    editMode?: string; 
};

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

 

 