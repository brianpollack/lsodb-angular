export interface IBreed {
    id: string;
    breedName: String
    editMode?: string; 
    livestock: ILivestockRef     
}

export interface ILivestockRef {
    livestockId: string;    
}

export interface IParamsCreateBreeds {
    livestockId: string
    breedName: string
  }

  export interface IParamsEditBreed {
    livestockId: string
    breedId: string
    breedName: string
  }

  export interface IParamsDeleteBreed {
    livestockId: string
    breedId: string
  }