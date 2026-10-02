export interface ContactBody {
  name?: string;
  email?: string;
  company?: string;
  need?: string;
  budget?: string;
  message?: string;
  website?: string;
}

export interface RequestLike {
  method?: string;
  headers: Record<string, string | string[] | undefined>;
  body?: ContactBody;
}

export interface ResponseLike {
  status: (code: number) => {
    json: (data: unknown) => void;
  };
}

export type ContactFields = {
  name: string;
  email: string;
  company: string;
  need: string;
  budget: string;
  message: string;
};
