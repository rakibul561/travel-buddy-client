export type UserRole = "ADMIN" | "USER";
export type TravelType = "SOLO" | "COUPLE" | "FAMILY" | "FRIENDS";
export type JoinRequestStatus = "PENDING" | "APPROVED" | "REJECTED";
export type SubscriptionPlan = "MONTHLY" | "YEARLY";

export interface IUser {
    id: string;
    name: string;
    fullName?: string;
    email: string;
    role: UserRole;
    profilePicture?: string;
    isVerified?: boolean;
    createdAt: string;
}

export interface ITravelPlan {
    id: string;
    destination: string;
    country: string;
    city: string;
    startDate: string;
    endDate: string;
    budgetMin: number;
    budgetMax: number;
    travelType: TravelType;
    description: string;
    image?: string;
    isCompleted: boolean;
    userId: string;
    user?: IUser;
    createdAt: string;
}

export interface IJoinRequest {
    id: string;
    travelPlanId: string;
    userId: string;
    status: JoinRequestStatus;
    message?: string;
    travelPlan?: ITravelPlan;
    user?: IUser;
    createdAt: string;
}

export interface IReview {
    id: string;
    travelPlanId: string;
    userId: string;
    rating: number;
    comment: string;
    user?: IUser;
    createdAt: string;
}

export interface IPayment {
    id: string;
    userId: string;
    amount: number;
    transactionId: string;
    plan: SubscriptionPlan;
    status: string;
    createdAt: string;
}
