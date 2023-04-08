export enum AnnotationType {
  image = 'Image',
  text = 'Text'
}

export interface AnnotationSize {
  width: number;
  height: number;
}

export interface Annotation {
  uuid: string;
  type: AnnotationType;
  content: File | string;
  page: number;
  position: {
    x: number;
    y: number;
  };
  size: AnnotationSize
}
