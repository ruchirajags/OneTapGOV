from config.basic_questions import BASIC_FIELDS


class ProfileService:

    @staticmethod
    def find_first_missing(profile: dict):

        for field in BASIC_FIELDS:

            value = profile.get(field)

            if value is None:
                return field

            if isinstance(value, str) and value.strip() == "":
                return field

        return None

    @staticmethod
    def is_basic_profile_complete(profile: dict):

        return ProfileService.find_first_missing(profile) is None

    @staticmethod
    def get_progress(profile: dict):

        total = len(BASIC_FIELDS)

        completed = 0

        for field in BASIC_FIELDS:

            value = profile.get(field)

            if value is not None:

                if isinstance(value, str):

                    if value.strip() != "":
                        completed += 1

                else:
                    completed += 1

        percentage = int((completed / total) * 100)

        return {
            "completed": completed,
            "total": total,
            "percentage": percentage
        }