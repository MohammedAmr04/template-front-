export type LoginResponse = {
  success: boolean;
  message: string;
  data: {
    token: string;
    system_type: "admin" | "hospital" | "lab" | "pharmacy";
    user: {
      id: number;
      name: string;
      email: string;
      status: "active" | "inactive" | string;
      image: string | null;
      fcm_token: string | null;
      created_at: string;
      updated_at: string;
    };
  };
};
