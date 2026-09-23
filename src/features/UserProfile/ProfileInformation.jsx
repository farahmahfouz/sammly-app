import { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import UserContext from '../../context/UserContext';
import Skelton from './../../layouts/Skelton';
import { AiOutlineUserSwitch } from 'react-icons/ai';
import { MdOutlineEditLocation } from 'react-icons/md';
import { MdOutlinePhoneBluetoothSpeaker } from 'react-icons/md';
import { MdOutlineAttachEmail } from 'react-icons/md';

const PROFILE_FIELDS = [
    { name: 'name', label: 'Name', icon: AiOutlineUserSwitch, capitalize: false, editable: true },
    { name: 'address', label: 'Address', icon: MdOutlineEditLocation, capitalize: true, editable: true },
    { name: 'email', label: 'Email', icon: MdOutlineAttachEmail, capitalize: false, editable: false },
    { name: 'phone', label: 'Phone', icon: MdOutlinePhoneBluetoothSpeaker, capitalize: false, editable: true },
];

const getInitialProfile = (userProfile) =>
    PROFILE_FIELDS.reduce((acc, field) => {
        acc[field.name] = userProfile?.[field.name] || '';
        return acc;
    }, {});

function ProfileField({ field, value, isEditing, onChange }) {
    const Icon = field.icon;
    const showInput = isEditing && field.editable;

    return (
        <>
            <div className="grid grid-cols-3 items-center gap-4">
                <div className="col-span-1 flex gap-2 items-center">
                    <div className="p-3 bg-surfacePurple/40 text-primaryDark text-xl rounded-full">
                        <Icon />
                    </div>
                    <h6 className="text-textSecondary tracking-tighter">{field.label}</h6>
                </div>
                <div
                    className={`col-span-2 text-textPrimary font-semibold ${field.capitalize ? 'capitalize' : ''
                        }`}
                >
                    {showInput ? (
                        <input
                            type="text"
                            name={field.name}
                            value={value}
                            onChange={onChange}
                            className="border border-borderLight focus:border-primary focus:outline-none rounded-full px-4 py-2"
                        />
                    ) : (
                        value
                    )}
                </div>
            </div>
            <span className="block w-8/12 border-t border-borderLight mx-auto" />
        </>
    );
}

function ConfirmSaveModal({ isSaving, onConfirm, onCancel }) {
    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-lg font-semibold mb-4">Confirm Changes</h3>
                <p>Are you sure you want to save these changes?</p>
                <div className="flex justify-end gap-2 mt-4">
                    <button
                        className="btn bg-buttonColor hover:bg-hoverButton text-white"
                        onClick={onConfirm}
                        disabled={isSaving}
                    >
                        {isSaving ? <span className="loading loading-ring loading-md"></span> : 'Confirm'}
                    </button>
                    <button
                        className="btn btn-outline text-gray-500 hover:bg-gray-700 mr-2"
                        onClick={onCancel}
                        disabled={isSaving}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}

export default function ProfileInformation() {
    const { userProfile, isEditing, error, handleEditProfile, handleCancelEdit, handleSaveProfile } =
        useContext(UserContext);

    const [showModal, setShowModal] = useState(false);
    const [editedProfile, setEditedProfile] = useState(getInitialProfile(userProfile));
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        if (isEditing) {
            setEditedProfile(getInitialProfile(userProfile));
        }
    }, [isEditing, userProfile]);

    if (!userProfile) {
        return <Skelton />;
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedProfile((prev) => ({ ...prev, [name]: value }));
    };

    const handleSaveClick = (e) => {
        e.preventDefault();
        setShowModal(true);
    };

    const handleEditConfirm = async () => {
        setIsSaving(true);
        try {
            await handleSaveProfile(editedProfile);
            toast.success('Profile updated successfully!');
            window.location.reload();
        } catch (err) {
            console.error('Error saving profile:', err);
            toast.error('Error updating profile. Please try again.');
        } finally {
            setIsSaving(false);
            setShowModal(false);
        }
    };

    const handleEditCancel = () => setShowModal(false);

    const handleCancelEditing = () => {
        setEditedProfile(getInitialProfile(userProfile));
        handleCancelEdit();
    };

    return (
        <div className="bg-white shadow-cardShadow rounded-xl p-4 mb-4">
            <div className="flex flex-col gap-2 ">
                <div className='flex justify-between pb-4 items-center'>
                    <div className="flex items-center gap-1">
                        <div className="text-primary text-3xl rounded-full">
                            <MdOutlineEditLocation />
                        </div>
                        <p className="capitalize font-bold ">my information</p>
                    </div>
                    <div className="flex justify-end gap-2">
                        {isEditing ? (
                            <>
                                <button
                                    type="button"
                                    className="py-2 px-4 rounded-full border border-gray-300 hover:bg-gray-100 transition-all text-sm text-gray-600"
                                    onClick={handleCancelEditing}
                                    disabled={isSaving}
                                >
                                    Cancel
                                </button>
                                <button
                                    className="py-2 px-4 rounded-full bg-primary hover:bg-primaryDark transition-all text-sm text-white"
                                    onClick={handleSaveClick}
                                    disabled={isSaving}
                                >
                                    {isSaving ? (
                                        <span className="loading loading-ring loading-md"></span>
                                    ) : (
                                        'Save Changes'
                                    )}
                                </button>
                            </>
                        ) : (
                            <button
                                className="py-2 px-4 rounded-full border border-primary  transition-all text-sm text-primary"
                                onClick={handleEditProfile}
                            >
                                Edit
                            </button>
                        )}
                    </div>
                </div>

                {error && <div className="text-red-500 mb-4">{error}</div>}

                {PROFILE_FIELDS.map((field) => (
                    <ProfileField
                        key={field.name}
                        field={field}
                        value={isEditing ? editedProfile[field.name] : userProfile[field.name]}
                        isEditing={isEditing}
                        onChange={handleInputChange}
                    />
                ))}


            </div>


            {showModal && (
                <ConfirmSaveModal
                    isSaving={isSaving}
                    onConfirm={handleEditConfirm}
                    onCancel={handleEditCancel}
                />
            )}
        </div>
    );
}