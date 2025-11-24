export type MockOptional = {
  id: number;
  type: "simple" | "options";
  name: string;
  price?: number;
  code?: string;
  min?: number;
  max?: number;
  canRepeat?: boolean;
  options?: {
    name: string;
    price: number;
    code?: string;
  }[];
  disabled: boolean;
  createdAt: string;
};

export const mockOptionals: MockOptional[] = [
  // Opcional Simples
  {
    id: 1,
    type: "simple",
    name: "Queijo Extra",
    price: 2.5,
    code: "QJ001",
    disabled: false,
    createdAt: "2025-01-15T10:00:00Z",
  },
  {
    id: 2,
    type: "simple",
    name: "Bacon",
    price: 3.0,
    code: "BC002",
    disabled: false,
    createdAt: "2025-01-16T11:30:00Z",
  },
  {
    id: 3,
    type: "simple",
    name: "Cebola Caramelizada",
    price: 1.5,
    code: "CB003",
    disabled: true,
    createdAt: "2025-01-17T14:20:00Z",
  },
  // Opcional de Opções - Temperos
  {
    id: 4,
    type: "options",
    name: "Temperos",
    min: 1,
    max: 3,
    canRepeat: false,
    options: [
      { name: "Orégano", price: 0.5, code: "OR001" },
      { name: "Manjericão", price: 0.8, code: "MJ002" },
      { name: "Alecrim", price: 1.0, code: "AL003" },
      { name: "Tomilho", price: 0.7, code: "TM004" },
    ],
    disabled: false,
    createdAt: "2025-01-18T09:15:00Z",
  },
  // Opcional de Opções - Molhos
  {
    id: 5,
    type: "options",
    name: "Molhos",
    min: 0,
    max: 2,
    canRepeat: true,
    options: [
      { name: "Barbecue", price: 2.0, code: "BB001" },
      { name: "Maionese Temperada", price: 1.5, code: "MT002" },
      { name: "Mostarda", price: 1.0, code: "MS003" },
      { name: "Ketchup", price: 0.5, code: "KT004" },
    ],
    disabled: false,
    createdAt: "2025-01-19T16:45:00Z",
  },
  // Opcional de Opções - Massas
  {
    id: 6,
    type: "options",
    name: "Tipo de Massa",
    min: 1,
    max: 1,
    canRepeat: false,
    options: [
      { name: "Tradicional", price: 0, code: "TR001" },
      { name: "Integral", price: 2.0, code: "IN002" },
      { name: "Sem Glúten", price: 3.5, code: "SG003" },
    ],
    disabled: false,
    createdAt: "2025-01-20T12:30:00Z",
  },
  // Outro opcional simples
  {
    id: 7,
    type: "simple",
    name: "Azeitona",
    price: 1.2,
    code: "AZ004",
    disabled: false,
    createdAt: "2025-01-21T08:00:00Z",
  },
  // Opcional de Opções - Bebidas
  {
    id: 8,
    type: "options",
    name: "Bebidas",
    min: 0,
    max: 3,
    canRepeat: true,
    options: [
      { name: "Refrigerante Cola 350ml", price: 4.0, code: "RC001" },
      { name: "Suco de Laranja 300ml", price: 3.5, code: "SL002" },
      { name: "Água com Gás 500ml", price: 2.5, code: "AG003" },
      { name: "Cerveja 600ml", price: 8.0, code: "CV004" },
    ],
    disabled: true,
    createdAt: "2025-01-22T17:20:00Z",
  },
];
