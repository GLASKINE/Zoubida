export type listeTables = "user" | "account" | "role" | "child" | "type" | "song";

interface attributSelectInterface {
    primaryKey: string;
    attribut: Array<string>;
}

/**
 *
 * List of the property retrieved for the Select method
 * @readonly
 * @type {Array < string >}
 */
 const listAttributSelect: Record<listeTables, attributSelectInterface> = {
    "user": {
        primaryKey: `idUser`,
        attribut: [`idUser`, `firstname`, `lastname`, `gender`, `idRole`, `birthdate`, `createdAt`, `updatedAt`, `subscription`, `stripe_customerId`]
    },
    "account": {
        primaryKey: `idUser`,
        attribut: [`email`, `password`, `idUser`]
    },
    "role": {
        primaryKey: `idRole`,
        attribut: [`idRole`, `name`]
    },
    "child": {
        primaryKey: `child_id`,
        attribut: [`child_id`, `tutor_id`]
    },
    "type": {
        primaryKey: `idType`,
        attribut: [`idType`, `name`]
    },
    "song": {
        primaryKey: `idSong`,
        attribut: [`idSong`, `name`, `cover`, `time`, `createdAt`, `updatedAt`, `idType`]
    },
};

export default listAttributSelect;