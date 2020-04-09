export interface Livestock  {
    id: string;
    livestockName: string;
    breedCount: number;
    breeds: Breed[];
    editMode?: string; 
};

export interface Breed {
    id: string;
    breedName: String
    livestock: LivestockRef 
    
  }

 export interface LivestockRef {
    livestockId: String;    
}




 

 