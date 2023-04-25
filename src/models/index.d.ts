import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled, AsyncCollection, AsyncItem } from "@aws-amplify/datastore";





type EagerListing = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Listing, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly creator: string;
  readonly title: string;
  readonly description: string;
  readonly roomType: string;
  readonly propertyType: string;
  readonly rate: number;
  readonly negotiable: boolean;
  readonly startDate: string;
  readonly endDate: string;
  readonly campus: string;
  readonly address: string;
  readonly photoDirectory: string;
  readonly perks: string;
  readonly comments?: (Comment | null)[] | null;
  readonly likes?: (Like | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyListing = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Listing, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly creator: string;
  readonly title: string;
  readonly description: string;
  readonly roomType: string;
  readonly propertyType: string;
  readonly rate: number;
  readonly negotiable: boolean;
  readonly startDate: string;
  readonly endDate: string;
  readonly campus: string;
  readonly address: string;
  readonly photoDirectory: string;
  readonly perks: string;
  readonly comments: AsyncCollection<Comment>;
  readonly likes: AsyncCollection<Like>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Listing = LazyLoading extends LazyLoadingDisabled ? EagerListing : LazyListing

export declare const Listing: (new (init: ModelInit<Listing>) => Listing) & {
  copyOf(source: Listing, mutator: (draft: MutableModel<Listing>) => MutableModel<Listing> | void): Listing;
}

type EagerComment = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Comment, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly respondingTo?: string | null;
  readonly content: string;
  readonly author: string;
  readonly listing: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyComment = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Comment, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly respondingTo?: string | null;
  readonly content: string;
  readonly author: string;
  readonly listing: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Comment = LazyLoading extends LazyLoadingDisabled ? EagerComment : LazyComment

export declare const Comment: (new (init: ModelInit<Comment>) => Comment) & {
  copyOf(source: Comment, mutator: (draft: MutableModel<Comment>) => MutableModel<Comment> | void): Comment;
}

type EagerUser = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<User, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name: string;
  readonly email: string;
  readonly picture: string;
  readonly gender: string;
  readonly birthDate: string;
  readonly comments?: (Comment | null)[] | null;
  readonly listings?: (Comment | null)[] | null;
  readonly likedListings?: (Like | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyUser = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<User, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name: string;
  readonly email: string;
  readonly picture: string;
  readonly gender: string;
  readonly birthDate: string;
  readonly comments: AsyncCollection<Comment>;
  readonly listings: AsyncCollection<Comment>;
  readonly likedListings: AsyncCollection<Like>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type User = LazyLoading extends LazyLoadingDisabled ? EagerUser : LazyUser

export declare const User: (new (init: ModelInit<User>) => User) & {
  copyOf(source: User, mutator: (draft: MutableModel<User>) => MutableModel<User> | void): User;
}

type EagerLike = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Like, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly listingId?: string | null;
  readonly userId?: string | null;
  readonly listing: Listing;
  readonly user: User;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyLike = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Like, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly listingId?: string | null;
  readonly userId?: string | null;
  readonly listing: AsyncItem<Listing>;
  readonly user: AsyncItem<User>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Like = LazyLoading extends LazyLoadingDisabled ? EagerLike : LazyLike

export declare const Like: (new (init: ModelInit<Like>) => Like) & {
  copyOf(source: Like, mutator: (draft: MutableModel<Like>) => MutableModel<Like> | void): Like;
}